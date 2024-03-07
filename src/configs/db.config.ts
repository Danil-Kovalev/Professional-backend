import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';


// export const dataSourceOptions: DataSourceOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '',
//   database: 'entity',
//   entities: ['dist/entity/*.entity.js'],
//   synchronize: true,
//   migrations: ["dist/configs/migrations/*.js"]
// }

// const dataSource = new DataSource(dataSourceOptions);

// export default dataSource;

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        type: 'mysql',
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSSWORD'),
        database: this.configService.get<string>('DB_DATABASE'),
        entities: ['dist/entity/*.entity.js'],
        synchronize: true,
        migrations: ["dist/configs/migrations/*.js"]
    };
  }
}