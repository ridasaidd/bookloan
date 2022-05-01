/* eslint import/no-webpack-loader-syntax: off */

import { DATA_TYPE, Connection } from 'jsstore';

const getWorkerPath = () => {
    if (process.env.NODE_ENV === 'development') {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }
    else {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
};

const workerPath = getWorkerPath().default;
export const idbCon = new Connection(new Worker(workerPath));
export const dbname = 'bookstore';

const getDatabase = () => {
    const tblUsers = {
        name: 'Users',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            password: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            isLoggedIn: {
                dataType: DATA_TYPE.Boolean,
                default: false
            }
        }
    };
    const dataBase = {
        name: dbname,
        tables: [tblUsers]
    };
    return dataBase;
};

export const initJsStore = async () => {
    try {
        const dataBase = getDatabase();
        const conn = await idbCon.initDb(dataBase);

        if (conn) {
            console.info('db created & opened => ');
        } else {
            console.info('db opened => ');
        }
    }
    catch (ex) {
        console.error(ex);
    }
};