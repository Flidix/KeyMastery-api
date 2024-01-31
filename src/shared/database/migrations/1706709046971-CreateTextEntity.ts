import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTextEntity1706709046971 implements MigrationInterface {
    name = 'CreateTextEntity1706709046971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "texts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" text array NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ce044efbc0a1872f20feca7e19f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "currentTextId" integer`);
        await queryRunner.query(`ALTER TABLE "texts" ADD CONSTRAINT "FK_2b434bb7e2338cef909015a187d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a46068fc9eb9538561c1a1e548e" FOREIGN KEY ("currentTextId") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a46068fc9eb9538561c1a1e548e"`);
        await queryRunner.query(`ALTER TABLE "texts" DROP CONSTRAINT "FK_2b434bb7e2338cef909015a187d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currentTextId"`);
        await queryRunner.query(`DROP TABLE "texts"`);
    }

}
