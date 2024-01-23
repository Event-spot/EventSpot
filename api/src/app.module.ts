import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {join} from "path";
import {ConfigModule} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfigAsync} from "./config/typeorm.config";
import {EventsModule} from "./events/events.module";
import CommentsModule from "./comments/comments.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true
        }),
        TypeOrmModule.forRootAsync(typeormConfigAsync),
        UsersModule,
        EventsModule,
        CommentsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
