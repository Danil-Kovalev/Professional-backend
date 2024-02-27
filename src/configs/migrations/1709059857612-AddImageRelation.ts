import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageRelation1709059857612 implements MigrationInterface {
    name = 'AddImageRelation1709059857612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`peopleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`images\``);
    }

}
