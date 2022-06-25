import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import { clients, projects } from '../sample-data.js';
import { Client } from '../models/client.js';
import { Project } from '../models/project.js';

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.client);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Client.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(_, args) {
        const client = Client.findById(args.id);
        return Client.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name || client.name,
            email: args.email || client.email,
            phone: args.phone || client.phone,
          },
        });
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              done: { value: 'Done' },
            },
          }),
          defaultValue: 'Not Started',
        },
        client: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          client: args.client,
        });
        return project.save();
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLID },
      },
      resolve(_, args) {
        const project = Project.findById(args.id);
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name || project.name,
              description: args.description || project.description,
              status: args.status || project.status,
              clientId: args.clientId || project.clientId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
