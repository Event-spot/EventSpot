import { MigrationInterface, QueryRunner } from "typeorm";

export class AutomaticMigration1705787080924 implements MigrationInterface {
    name = 'AutomaticMigration1705787080924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "eventId" integer, CONSTRAINT "PK_comments" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "localization" character varying, "spots_visited" integer NOT NULL, "followers" integer NOT NULL, "following" integer NOT NULL, CONSTRAINT "PK_users" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" date NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "localization" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_events" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_attendees_users" ("eventsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_75d2b75c2969af882491c8353b2" PRIMARY KEY ("eventsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cc4d1dac2b0c139aa3c722401b" ON "events_attendees_users" ("eventsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_55e9eaa2a8199f6d56e8f851bc" ON "events_attendees_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_555f90935f4c6d26c351af601fc" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_attendees_users" ADD CONSTRAINT "FK_cc4d1dac2b0c139aa3c722401b1" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_attendees_users" ADD CONSTRAINT "FK_55e9eaa2a8199f6d56e8f851bcd" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_attendees_users" DROP CONSTRAINT "FK_55e9eaa2a8199f6d56e8f851bcd"`);
        await queryRunner.query(`ALTER TABLE "events_attendees_users" DROP CONSTRAINT "FK_cc4d1dac2b0c139aa3c722401b1"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_555f90935f4c6d26c351af601fc"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55e9eaa2a8199f6d56e8f851bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc4d1dac2b0c139aa3c722401b"`);
        await queryRunner.query(`DROP TABLE "events_attendees_users"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
