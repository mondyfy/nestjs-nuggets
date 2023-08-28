import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUploads1693199347410 implements MigrationInterface {
    name = 'CreateTableUploads1693199347410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "uploads" ("id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "mime_type" character varying NOT NULL, CONSTRAINT "UQ_218027b00e9cc2f9193e74621cd" UNIQUE ("url"), CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "uploads"`);
    }

}
