import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUploadsAddColumnProvider1693242262504 implements MigrationInterface {
    name = 'UpdateTableUploadsAddColumnProvider1693242262504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads" ADD "provider" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads" DROP COLUMN "provider"`);
    }

}
