import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecordEntity1707584243081 implements MigrationInterface {
    name = 'CreateRecordEntity1707584243081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a46068fc9eb9538561c1a1e548e"`);
        await queryRunner.query(`CREATE TABLE "records" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "WPM" integer NOT NULL, "userId" integer NOT NULL, "textId" integer NOT NULL, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currentTextId"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_b60128e4898c3c177b89f194912" FOREIGN KEY ("textId") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_b392510e8a9898d395a871bd9cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_b392510e8a9898d395a871bd9cf"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_b60128e4898c3c177b89f194912"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "currentTextId" integer`);
        await queryRunner.query(`DROP TABLE "records"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a46068fc9eb9538561c1a1e548e" FOREIGN KEY ("currentTextId") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
