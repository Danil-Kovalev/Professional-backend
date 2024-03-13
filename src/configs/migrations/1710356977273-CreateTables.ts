import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1710356977273 implements MigrationInterface {
    name = 'CreateTables1710356977273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`rotation_period\` int NOT NULL, \`orbital_period\` int NOT NULL, \`diameter\` int NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` int NOT NULL, \`population\` int NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_heigh\` int NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`average_lifespan\` int NOT NULL, \`language\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`planets_id\` int NULL, UNIQUE INDEX \`REL_214c6cd751418b17eead877e30\` (\`planets_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` int NOT NULL, \`length\` int NOT NULL, \`max_atmosphering_speed\` int NOT NULL, \`crew\` int NOT NULL, \`passengers\` int NOT NULL, \`cargo_capacity\` int NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` int NOT NULL, \`MGLT\` int NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`urlImage\` varchar(255) NOT NULL, \`urlAPI\` varchar(255) NOT NULL, \`peopleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` int NOT NULL, \`mass\` int NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` varchar(255) NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` datetime NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` int NOT NULL, \`length\` int NOT NULL, \`max_atmosphering_speed\` int NOT NULL, \`crew\` int NOT NULL, \`passengers\` int NOT NULL, \`cargo_capacity\` int NOT NULL, \`consumables\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peoples_planets\` (\`people_id\` int NOT NULL, \`planets_id\` int NOT NULL, INDEX \`IDX_9cb76a4da9f5671a6308f03a74\` (\`people_id\`), INDEX \`IDX_614a475f0005af1460a8773904\` (\`planets_id\`), PRIMARY KEY (\`people_id\`, \`planets_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peoples_films\` (\`peoples_id\` int NOT NULL, \`films_id\` int NOT NULL, INDEX \`IDX_e2d1793bcf4cf20413d909b777\` (\`peoples_id\`), INDEX \`IDX_0626d6dbd282bc04650acbc5d8\` (\`films_id\`), PRIMARY KEY (\`peoples_id\`, \`films_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peoples_species\` (\`people_id\` int NOT NULL, \`species_id\` int NOT NULL, INDEX \`IDX_aded37e7c57f775b930c14213f\` (\`people_id\`), INDEX \`IDX_bd47bf66a2593c5d5d094b513d\` (\`species_id\`), PRIMARY KEY (\`people_id\`, \`species_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peoples_vehicles\` (\`people_id\` int NOT NULL, \`vehicles_id\` int NOT NULL, INDEX \`IDX_a06cb973e35c12dd51b893ad83\` (\`people_id\`), INDEX \`IDX_4960fe3de3713898f311fa1942\` (\`vehicles_id\`), PRIMARY KEY (\`people_id\`, \`vehicles_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peoples_starships\` (\`people_id\` int NOT NULL, \`starships_id\` int NOT NULL, INDEX \`IDX_764fa3ce69d79e00d2052220c9\` (\`people_id\`), INDEX \`IDX_eae4c1c51971cf3ccced5876b8\` (\`starships_id\`), PRIMARY KEY (\`people_id\`, \`starships_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships\` (\`films_id\` int NOT NULL, \`starships_id\` int NOT NULL, INDEX \`IDX_1a4ca2fc569b5b59f4d5effc4d\` (\`films_id\`), INDEX \`IDX_3d33c7a49635895c92e167d376\` (\`starships_id\`), PRIMARY KEY (\`films_id\`, \`starships_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles\` (\`films_id\` int NOT NULL, \`vehicles_id\` int NOT NULL, INDEX \`IDX_01c3a35a6eed1fc680431fc82f\` (\`films_id\`), INDEX \`IDX_37617d1f0a1ddebcc4c4bdb274\` (\`vehicles_id\`), PRIMARY KEY (\`films_id\`, \`vehicles_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species\` (\`films_id\` int NOT NULL, \`species_id\` int NOT NULL, INDEX \`IDX_b1e3218c6b297a92e5f6fc6bec\` (\`films_id\`), INDEX \`IDX_33627205eb18f19ef50b7b16aa\` (\`species_id\`), PRIMARY KEY (\`films_id\`, \`species_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets\` (\`films_id\` int NOT NULL, \`planets_id\` int NOT NULL, INDEX \`IDX_1d9f53c503d1124277496c3151\` (\`films_id\`), INDEX \`IDX_9ee75db30fc8e639561bbe4567\` (\`planets_id\`), PRIMARY KEY (\`films_id\`, \`planets_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_214c6cd751418b17eead877e302\` FOREIGN KEY (\`planets_id\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_7aaee71fd817df85dd0e24d52a6\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peoples_planets\` ADD CONSTRAINT \`FK_9cb76a4da9f5671a6308f03a743\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`peoples_planets\` ADD CONSTRAINT \`FK_614a475f0005af1460a87739045\` FOREIGN KEY (\`planets_id\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peoples_films\` ADD CONSTRAINT \`FK_e2d1793bcf4cf20413d909b777b\` FOREIGN KEY (\`peoples_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`peoples_films\` ADD CONSTRAINT \`FK_0626d6dbd282bc04650acbc5d89\` FOREIGN KEY (\`films_id\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peoples_species\` ADD CONSTRAINT \`FK_aded37e7c57f775b930c14213f8\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`peoples_species\` ADD CONSTRAINT \`FK_bd47bf66a2593c5d5d094b513dd\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peoples_vehicles\` ADD CONSTRAINT \`FK_a06cb973e35c12dd51b893ad839\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`peoples_vehicles\` ADD CONSTRAINT \`FK_4960fe3de3713898f311fa19421\` FOREIGN KEY (\`vehicles_id\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peoples_starships\` ADD CONSTRAINT \`FK_764fa3ce69d79e00d2052220c9a\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`peoples_starships\` ADD CONSTRAINT \`FK_eae4c1c51971cf3ccced5876b86\` FOREIGN KEY (\`starships_id\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_1a4ca2fc569b5b59f4d5effc4db\` FOREIGN KEY (\`films_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_3d33c7a49635895c92e167d376f\` FOREIGN KEY (\`starships_id\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_01c3a35a6eed1fc680431fc82ff\` FOREIGN KEY (\`films_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_37617d1f0a1ddebcc4c4bdb2744\` FOREIGN KEY (\`vehicles_id\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_b1e3218c6b297a92e5f6fc6bec3\` FOREIGN KEY (\`films_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_33627205eb18f19ef50b7b16aa5\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_1d9f53c503d1124277496c31510\` FOREIGN KEY (\`films_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_9ee75db30fc8e639561bbe45675\` FOREIGN KEY (\`planets_id\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_9ee75db30fc8e639561bbe45675\``);
        await queryRunner.query(`ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_1d9f53c503d1124277496c31510\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_33627205eb18f19ef50b7b16aa5\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_b1e3218c6b297a92e5f6fc6bec3\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_37617d1f0a1ddebcc4c4bdb2744\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_01c3a35a6eed1fc680431fc82ff\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_3d33c7a49635895c92e167d376f\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_1a4ca2fc569b5b59f4d5effc4db\``);
        await queryRunner.query(`ALTER TABLE \`peoples_starships\` DROP FOREIGN KEY \`FK_eae4c1c51971cf3ccced5876b86\``);
        await queryRunner.query(`ALTER TABLE \`peoples_starships\` DROP FOREIGN KEY \`FK_764fa3ce69d79e00d2052220c9a\``);
        await queryRunner.query(`ALTER TABLE \`peoples_vehicles\` DROP FOREIGN KEY \`FK_4960fe3de3713898f311fa19421\``);
        await queryRunner.query(`ALTER TABLE \`peoples_vehicles\` DROP FOREIGN KEY \`FK_a06cb973e35c12dd51b893ad839\``);
        await queryRunner.query(`ALTER TABLE \`peoples_species\` DROP FOREIGN KEY \`FK_bd47bf66a2593c5d5d094b513dd\``);
        await queryRunner.query(`ALTER TABLE \`peoples_species\` DROP FOREIGN KEY \`FK_aded37e7c57f775b930c14213f8\``);
        await queryRunner.query(`ALTER TABLE \`peoples_films\` DROP FOREIGN KEY \`FK_0626d6dbd282bc04650acbc5d89\``);
        await queryRunner.query(`ALTER TABLE \`peoples_films\` DROP FOREIGN KEY \`FK_e2d1793bcf4cf20413d909b777b\``);
        await queryRunner.query(`ALTER TABLE \`peoples_planets\` DROP FOREIGN KEY \`FK_614a475f0005af1460a87739045\``);
        await queryRunner.query(`ALTER TABLE \`peoples_planets\` DROP FOREIGN KEY \`FK_9cb76a4da9f5671a6308f03a743\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_7aaee71fd817df85dd0e24d52a6\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_214c6cd751418b17eead877e302\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ee75db30fc8e639561bbe4567\` ON \`films_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_1d9f53c503d1124277496c3151\` ON \`films_planets\``);
        await queryRunner.query(`DROP TABLE \`films_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_33627205eb18f19ef50b7b16aa\` ON \`films_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1e3218c6b297a92e5f6fc6bec\` ON \`films_species\``);
        await queryRunner.query(`DROP TABLE \`films_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_37617d1f0a1ddebcc4c4bdb274\` ON \`films_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_01c3a35a6eed1fc680431fc82f\` ON \`films_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d33c7a49635895c92e167d376\` ON \`films_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a4ca2fc569b5b59f4d5effc4d\` ON \`films_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_eae4c1c51971cf3ccced5876b8\` ON \`peoples_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_764fa3ce69d79e00d2052220c9\` ON \`peoples_starships\``);
        await queryRunner.query(`DROP TABLE \`peoples_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_4960fe3de3713898f311fa1942\` ON \`peoples_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a06cb973e35c12dd51b893ad83\` ON \`peoples_vehicles\``);
        await queryRunner.query(`DROP TABLE \`peoples_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd47bf66a2593c5d5d094b513d\` ON \`peoples_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_aded37e7c57f775b930c14213f\` ON \`peoples_species\``);
        await queryRunner.query(`DROP TABLE \`peoples_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_0626d6dbd282bc04650acbc5d8\` ON \`peoples_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2d1793bcf4cf20413d909b777\` ON \`peoples_films\``);
        await queryRunner.query(`DROP TABLE \`peoples_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_614a475f0005af1460a8773904\` ON \`peoples_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_9cb76a4da9f5671a6308f03a74\` ON \`peoples_planets\``);
        await queryRunner.query(`DROP TABLE \`peoples_planets\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP INDEX \`REL_214c6cd751418b17eead877e30\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
    }

}
