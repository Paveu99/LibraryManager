/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UserIndexImport } from './routes/user/index'
import { Route as RegisterIndexImport } from './routes/register/index'
import { Route as LogsHistoryIndexImport } from './routes/logs-history/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as BooksIndexImport } from './routes/books/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as BooksIdImport } from './routes/books/$id'
import { Route as UserStatsIndexImport } from './routes/user/stats/index'
import { Route as UserRentalsIndexImport } from './routes/user/rentals/index'
import { Route as UserDetailsIndexImport } from './routes/user/details/index'
import { Route as UserDeleteAccountIndexImport } from './routes/user/delete-account/index'
import { Route as AdminRentalsIndexImport } from './routes/admin/rentals/index'
import { Route as AdminBooksIndexImport } from './routes/admin/books/index'
import { Route as AdminRentalsIdImport } from './routes/admin/rentals/$id'
import { Route as AdminBooksEditIdImport } from './routes/admin/books/edit/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserIndexRoute = UserIndexImport.update({
  id: '/user/',
  path: '/user/',
  getParentRoute: () => rootRoute,
} as any)

const RegisterIndexRoute = RegisterIndexImport.update({
  id: '/register/',
  path: '/register/',
  getParentRoute: () => rootRoute,
} as any)

const LogsHistoryIndexRoute = LogsHistoryIndexImport.update({
  id: '/logs-history/',
  path: '/logs-history/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const BooksIndexRoute = BooksIndexImport.update({
  id: '/books/',
  path: '/books/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  id: '/admin/',
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any)

const BooksIdRoute = BooksIdImport.update({
  id: '/books/$id',
  path: '/books/$id',
  getParentRoute: () => rootRoute,
} as any)

const UserStatsIndexRoute = UserStatsIndexImport.update({
  id: '/user/stats/',
  path: '/user/stats/',
  getParentRoute: () => rootRoute,
} as any)

const UserRentalsIndexRoute = UserRentalsIndexImport.update({
  id: '/user/rentals/',
  path: '/user/rentals/',
  getParentRoute: () => rootRoute,
} as any)

const UserDetailsIndexRoute = UserDetailsIndexImport.update({
  id: '/user/details/',
  path: '/user/details/',
  getParentRoute: () => rootRoute,
} as any)

const UserDeleteAccountIndexRoute = UserDeleteAccountIndexImport.update({
  id: '/user/delete-account/',
  path: '/user/delete-account/',
  getParentRoute: () => rootRoute,
} as any)

const AdminRentalsIndexRoute = AdminRentalsIndexImport.update({
  id: '/admin/rentals/',
  path: '/admin/rentals/',
  getParentRoute: () => rootRoute,
} as any)

const AdminBooksIndexRoute = AdminBooksIndexImport.update({
  id: '/admin/books/',
  path: '/admin/books/',
  getParentRoute: () => rootRoute,
} as any)

const AdminRentalsIdRoute = AdminRentalsIdImport.update({
  id: '/admin/rentals/$id',
  path: '/admin/rentals/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminBooksEditIdRoute = AdminBooksEditIdImport.update({
  id: '/admin/books/edit/$id',
  path: '/admin/books/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/books/$id': {
      id: '/books/$id'
      path: '/books/$id'
      fullPath: '/books/$id'
      preLoaderRoute: typeof BooksIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof rootRoute
    }
    '/books/': {
      id: '/books/'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof BooksIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/logs-history/': {
      id: '/logs-history/'
      path: '/logs-history'
      fullPath: '/logs-history'
      preLoaderRoute: typeof LogsHistoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/register/': {
      id: '/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/': {
      id: '/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/rentals/$id': {
      id: '/admin/rentals/$id'
      path: '/admin/rentals/$id'
      fullPath: '/admin/rentals/$id'
      preLoaderRoute: typeof AdminRentalsIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/books/': {
      id: '/admin/books/'
      path: '/admin/books'
      fullPath: '/admin/books'
      preLoaderRoute: typeof AdminBooksIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/rentals/': {
      id: '/admin/rentals/'
      path: '/admin/rentals'
      fullPath: '/admin/rentals'
      preLoaderRoute: typeof AdminRentalsIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/delete-account/': {
      id: '/user/delete-account/'
      path: '/user/delete-account'
      fullPath: '/user/delete-account'
      preLoaderRoute: typeof UserDeleteAccountIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/details/': {
      id: '/user/details/'
      path: '/user/details'
      fullPath: '/user/details'
      preLoaderRoute: typeof UserDetailsIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/rentals/': {
      id: '/user/rentals/'
      path: '/user/rentals'
      fullPath: '/user/rentals'
      preLoaderRoute: typeof UserRentalsIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/stats/': {
      id: '/user/stats/'
      path: '/user/stats'
      fullPath: '/user/stats'
      preLoaderRoute: typeof UserStatsIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/books/edit/$id': {
      id: '/admin/books/edit/$id'
      path: '/admin/books/edit/$id'
      fullPath: '/admin/books/edit/$id'
      preLoaderRoute: typeof AdminBooksEditIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/books/$id': typeof BooksIdRoute
  '/admin': typeof AdminIndexRoute
  '/books': typeof BooksIndexRoute
  '/login': typeof LoginIndexRoute
  '/logs-history': typeof LogsHistoryIndexRoute
  '/register': typeof RegisterIndexRoute
  '/user': typeof UserIndexRoute
  '/admin/rentals/$id': typeof AdminRentalsIdRoute
  '/admin/books': typeof AdminBooksIndexRoute
  '/admin/rentals': typeof AdminRentalsIndexRoute
  '/user/delete-account': typeof UserDeleteAccountIndexRoute
  '/user/details': typeof UserDetailsIndexRoute
  '/user/rentals': typeof UserRentalsIndexRoute
  '/user/stats': typeof UserStatsIndexRoute
  '/admin/books/edit/$id': typeof AdminBooksEditIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/books/$id': typeof BooksIdRoute
  '/admin': typeof AdminIndexRoute
  '/books': typeof BooksIndexRoute
  '/login': typeof LoginIndexRoute
  '/logs-history': typeof LogsHistoryIndexRoute
  '/register': typeof RegisterIndexRoute
  '/user': typeof UserIndexRoute
  '/admin/rentals/$id': typeof AdminRentalsIdRoute
  '/admin/books': typeof AdminBooksIndexRoute
  '/admin/rentals': typeof AdminRentalsIndexRoute
  '/user/delete-account': typeof UserDeleteAccountIndexRoute
  '/user/details': typeof UserDetailsIndexRoute
  '/user/rentals': typeof UserRentalsIndexRoute
  '/user/stats': typeof UserStatsIndexRoute
  '/admin/books/edit/$id': typeof AdminBooksEditIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/books/$id': typeof BooksIdRoute
  '/admin/': typeof AdminIndexRoute
  '/books/': typeof BooksIndexRoute
  '/login/': typeof LoginIndexRoute
  '/logs-history/': typeof LogsHistoryIndexRoute
  '/register/': typeof RegisterIndexRoute
  '/user/': typeof UserIndexRoute
  '/admin/rentals/$id': typeof AdminRentalsIdRoute
  '/admin/books/': typeof AdminBooksIndexRoute
  '/admin/rentals/': typeof AdminRentalsIndexRoute
  '/user/delete-account/': typeof UserDeleteAccountIndexRoute
  '/user/details/': typeof UserDetailsIndexRoute
  '/user/rentals/': typeof UserRentalsIndexRoute
  '/user/stats/': typeof UserStatsIndexRoute
  '/admin/books/edit/$id': typeof AdminBooksEditIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/books/$id'
    | '/admin'
    | '/books'
    | '/login'
    | '/logs-history'
    | '/register'
    | '/user'
    | '/admin/rentals/$id'
    | '/admin/books'
    | '/admin/rentals'
    | '/user/delete-account'
    | '/user/details'
    | '/user/rentals'
    | '/user/stats'
    | '/admin/books/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/books/$id'
    | '/admin'
    | '/books'
    | '/login'
    | '/logs-history'
    | '/register'
    | '/user'
    | '/admin/rentals/$id'
    | '/admin/books'
    | '/admin/rentals'
    | '/user/delete-account'
    | '/user/details'
    | '/user/rentals'
    | '/user/stats'
    | '/admin/books/edit/$id'
  id:
    | '__root__'
    | '/'
    | '/books/$id'
    | '/admin/'
    | '/books/'
    | '/login/'
    | '/logs-history/'
    | '/register/'
    | '/user/'
    | '/admin/rentals/$id'
    | '/admin/books/'
    | '/admin/rentals/'
    | '/user/delete-account/'
    | '/user/details/'
    | '/user/rentals/'
    | '/user/stats/'
    | '/admin/books/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BooksIdRoute: typeof BooksIdRoute
  AdminIndexRoute: typeof AdminIndexRoute
  BooksIndexRoute: typeof BooksIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
  LogsHistoryIndexRoute: typeof LogsHistoryIndexRoute
  RegisterIndexRoute: typeof RegisterIndexRoute
  UserIndexRoute: typeof UserIndexRoute
  AdminRentalsIdRoute: typeof AdminRentalsIdRoute
  AdminBooksIndexRoute: typeof AdminBooksIndexRoute
  AdminRentalsIndexRoute: typeof AdminRentalsIndexRoute
  UserDeleteAccountIndexRoute: typeof UserDeleteAccountIndexRoute
  UserDetailsIndexRoute: typeof UserDetailsIndexRoute
  UserRentalsIndexRoute: typeof UserRentalsIndexRoute
  UserStatsIndexRoute: typeof UserStatsIndexRoute
  AdminBooksEditIdRoute: typeof AdminBooksEditIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BooksIdRoute: BooksIdRoute,
  AdminIndexRoute: AdminIndexRoute,
  BooksIndexRoute: BooksIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
  LogsHistoryIndexRoute: LogsHistoryIndexRoute,
  RegisterIndexRoute: RegisterIndexRoute,
  UserIndexRoute: UserIndexRoute,
  AdminRentalsIdRoute: AdminRentalsIdRoute,
  AdminBooksIndexRoute: AdminBooksIndexRoute,
  AdminRentalsIndexRoute: AdminRentalsIndexRoute,
  UserDeleteAccountIndexRoute: UserDeleteAccountIndexRoute,
  UserDetailsIndexRoute: UserDetailsIndexRoute,
  UserRentalsIndexRoute: UserRentalsIndexRoute,
  UserStatsIndexRoute: UserStatsIndexRoute,
  AdminBooksEditIdRoute: AdminBooksEditIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/books/$id",
        "/admin/",
        "/books/",
        "/login/",
        "/logs-history/",
        "/register/",
        "/user/",
        "/admin/rentals/$id",
        "/admin/books/",
        "/admin/rentals/",
        "/user/delete-account/",
        "/user/details/",
        "/user/rentals/",
        "/user/stats/",
        "/admin/books/edit/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/books/$id": {
      "filePath": "books/$id.tsx"
    },
    "/admin/": {
      "filePath": "admin/index.tsx"
    },
    "/books/": {
      "filePath": "books/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/logs-history/": {
      "filePath": "logs-history/index.tsx"
    },
    "/register/": {
      "filePath": "register/index.tsx"
    },
    "/user/": {
      "filePath": "user/index.tsx"
    },
    "/admin/rentals/$id": {
      "filePath": "admin/rentals/$id.tsx"
    },
    "/admin/books/": {
      "filePath": "admin/books/index.tsx"
    },
    "/admin/rentals/": {
      "filePath": "admin/rentals/index.tsx"
    },
    "/user/delete-account/": {
      "filePath": "user/delete-account/index.tsx"
    },
    "/user/details/": {
      "filePath": "user/details/index.tsx"
    },
    "/user/rentals/": {
      "filePath": "user/rentals/index.tsx"
    },
    "/user/stats/": {
      "filePath": "user/stats/index.tsx"
    },
    "/admin/books/edit/$id": {
      "filePath": "admin/books/edit/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
