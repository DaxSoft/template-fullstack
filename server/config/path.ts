// ------------------------------------------------------------------
// | [requirements]
// ------------------------------------------------------------------

import { Route, Routes } from '@vorlefan/path';

// ------------------------------------------------------------------
// | Main Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', instance.resolve(__dirname, '..'));
    instance.alias('src', 'main');

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Main');

// ------------------------------------------------------------------
// | App Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('app').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'App');

// ------------------------------------------------------------------
// | Assets Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('assets').filepath);

    instance.inject('email', 'main');

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));

    instance
        .io()
        .folders('email')
        .map(({ name, path }) => instance.set(`email/${name}`, path));
}, 'Assets');

// ------------------------------------------------------------------
// | Assets Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('data').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Data');

// ------------------------------------------------------------------
// | Jobs Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('jobs').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Jobs');

// ------------------------------------------------------------------
// | Tasks Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('tasks').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Tasks');

// ------------------------------------------------------------------
// | Main Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('public').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Public');

// ------------------------------------------------------------------
// | Client Public Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', instance.resolve(__dirname, '..', 'public'));

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'ClientPublic');

// ------------------------------------------------------------------
// | [export]
// ------------------------------------------------------------------

const DataRoute = Route.Data;
const AppRoute = Route.App;
const MainRoute = Route.Main;
const JobsRoute = Route.Jobs;
const TasksRoute = Route.Tasks;
const PublicRoute = Route.Public;
const AssetsRotue = Route.Assets;
const ClientPublicRoute = Route.ClientPublic;

export {
    Route,
    Routes,
    DataRoute,
    AppRoute,
    MainRoute,
    JobsRoute,
    TasksRoute,
    PublicRoute,
    AssetsRotue,
    ClientPublicRoute,
};
