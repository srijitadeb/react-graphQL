const graphql = require('graphql');
const _ = require('lodash');

const { 
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList //list the books array
    } = graphql;

// dummy data
var books =[
    {name:'book1', genre:'Fantasy1',id:'1',authorId:'1'},
    {name:'book2', genre:'Fantasy2',id:'2',authorId:'2'},
    {name:'book3', genre:'Fantasy3',id:'3',authorId:'3'},
    {name:'book4', genre:'Fantasy4',id:'4',authorId:'4'},
    {name:'book5', genre:'Fantasy5',id:'5',authorId:'3'},
    {name:'book6', genre:'Fantasy6',id:'6',authorId:'2'},
];

var  authors =[
    {name: 'Author1', age: 44, id:'1'},
    {name: 'Author2', age: 40, id:'2'},
    {name: 'Author3', age: 34, id:'3'},
    {name: 'Author4', age: 24, id:'4'}

]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        // --------- relationship with books--------//
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                console.log("parent",parent);
                return _.filter(books, {authorId:parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID} },
            resolve(parent,args) {
                return _.find(authors, { id: args.id });
            }
        },
        //-----List all the books and authors------//
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});