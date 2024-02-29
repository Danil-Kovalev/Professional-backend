import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageRelation1709208992242 implements MigrationInterface {
    name = 'AddImageRelation1709208992242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`peopleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_7aaee71fd817df85dd0e24d52a6\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_7aaee71fd817df85dd0e24d52a6\``);
        await queryRunner.query(`DROP TABLE \`images\``);
    }

}
