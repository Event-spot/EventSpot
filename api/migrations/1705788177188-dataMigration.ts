import { MigrationInterface, QueryRunner } from "typeorm";

export class DataMigration1705788177188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
             INSERT INTO users (email, password, first_name, last_name, localization, spots_visited, followers, following) VALUES
             ('jan.nowak@gmail.com', 'test123', 'Jan', 'Nowak', 'Katowice', 3, 12, 150),
             ('michal@graczyk.com', 'test123', 'Michał', 'Graczyk', 'Kraków', 15, 3, 5),
             ('milena123@.com', 'test123', 'Milena', 'Kowalska', 'Sosnowiec', 53, 130, 10),
             ('Jacynthe86@yahoo.com', 'AGSzkh30_sKuMlz', 'Earl', 'Hessel', 'Rutherfordview', 20, 15, 14),
             ('Jacques14@hotmail.com', '2fSlo7IV1niHCPb', 'Leo', 'Ferry', 'New Kyleighmouth', 13, 26, 39)`);


        // Inserting Data to Event

        await queryRunner.query(`
            INSERT INTO events (name, date, localization, description) VALUES
            ('Motoryzacyjne Święto Niepodległości 2k24', '2024-11-11', 'Gliwice', 'test'),
            ('Zakończenie sezonu z ISB Crew', '2024-08-31', 'Bytom', 'test'),
            ('Mikołajki z NFSC', '2024-12-06', 'Kraków', 'test'),
            ('Illegal Zone Edition 1', '2024-07-23', 'Koszalin', 'test'),
            ('Halloween Night 24', '2024-10-31', 'Warszawa', 'test'),
            ('Japfest SilverStone', '2024-05-24', 'Radom', 'test')`)

        // Inserting Data to Attendees

        await queryRunner.query(`INSERT INTO events_attendees_users VALUES
            (1, 1),
            (1, 3),
            (1, 5),
            (2, 3),
            (2, 4),
            (3, 1),
            (3, 4),
            (4, 5),
            (4, 1),
            (5, 5),
            (5, 2),
            (6, 1),
            (6, 5),
            (6, 3),
            (6, 4);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
