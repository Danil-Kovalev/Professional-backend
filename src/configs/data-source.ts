import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'entity',
    entities: ['dist/entity/*.entity.js'],
    synchronize: true,
    migrations: ["dist/configs/migrations/*.js"]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;