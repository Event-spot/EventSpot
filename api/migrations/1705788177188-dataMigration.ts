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
        INSERT INTO events (name, date, localization, description, general_information, competitions, localization_details) VALUES
        ('Motoryzacyjne Święto Niepodległości 2k24', '2024-11-11', 'Gliwice', 'test', 'Największe święto motoryzacji w Polsce!', 'Zlot samochodowy, pokazy tuningowe, konkursy, wystawy', 'Stadion miejski, ul. Sportowa 1, Gliwice'),
        ('Zakończenie sezonu z ISB Crew', '2024-08-31', 'Bytom', 'test', 'Huczne zakończenie sezonu', 'Drag racing, prezentacje samochodów, muzyka na żywo', 'Areny miejskie, ul. Przykładowa 22, Bytom'),
        ('Mikołajki z NFSC', '2024-12-06', 'Kraków', 'test', 'Spotkanie z fanami samochodów', 'Wybór najładniejszych ozdób na samochodach, jazda świętym Mikołajem', 'Plac Krakowski, ul. Bożonarodzeniowa 3, Kraków'),
        ('Illegal Zone Edition 1', '2024-07-23', 'Koszalin', 'test', 'Nocne zloty w klimacie underground', 'Turniej illegalnych wyścigów, prezentacje aut tuningowanych', 'Sekretna lokalizacja, Koszalin'),
        ('Halloween Night 24', '2024-10-31', 'Warszawa', 'test', 'Halloweenowa noc z motoryzacją', 'Parada strasznych samochodów, konkurs na najbardziej kreatywny kostium', 'Aleje Ujazdowskie, Warszawa'),
        ('Japfest SilverStone', '2024-05-24', 'Radom', 'test', 'Największy zlot japońskich samochodów', 'Pokazy driftingu, prezentacje najnowszych modeli, konkurs na najlepsze auto', 'Lotnisko Radom, ul. Japońska 8, Radom');
    `)

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

        await queryRunner.query(`INSERT INTO comments (content, "userId", "eventId") VALUES 
            ('Super spocik, pozdrawiam z rodzinką :)', 1, 1),
            ('Najlepszy organizator, polecam', 4, 1),
            ('Sprzedam opla!', 5, 1),
            ('Kiedy kolejny zlot?', 3, 2),
            ('Super miejscówa', 2, 2),
            ('Wie ktoś jak naprawić radio?', 5, 3),
            ('Siema, spotykamy się godzinkę przed zlotem?', 1, 3),
            ('Fajne fotki', 3, 2),
            ('Czy wstęp jest za darmo?', 4, 3),
            ('Będzie można coś zjeść?', 3, 3),
            ('I kolejny super spocik', 1, 4),
            ('Kiedy dodacie zdjęcia z ostatniej imprezy?', 2, 5),
            ('Jakieś dokładniejsze szczegóły dojazdu?', 5, 5),
            ('Kto wpuścił tego passata?', 4, 6),
            ('Ostatnio było super!', 5, 6),
            ('Umyć Panu szybkę?', 2, 6)
            ;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
