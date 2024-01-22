import {DataSource} from "typeorm";
import {config} from 'dotenv';
import {ConfigService} from "@nestjs/config";

config();

const configService = new ConfigService();

export default new DataSource({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**'],
        synchronize: false
    }
)