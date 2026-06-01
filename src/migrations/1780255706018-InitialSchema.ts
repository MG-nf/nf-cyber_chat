import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1780255706018 implements MigrationInterface {
  name = 'InitialSchema1780255706018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" varchar PRIMARY KEY NOT NULL, 
            "name" varchar NOT NULL, 
            "email" varchar NOT NULL, 
            "password" varchar NOT NULL, 
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "threads" (
            "id" varchar PRIMARY KEY NOT NULL, 
            "title" varchar NOT NULL, 
            "body" text NOT NULL, 
            "createdAt" datetime NOT NULL DEFAULT (datetime('now')), 
            "authorId" varchar NOT NULL,
            CONSTRAINT "FK_7d2172aeb12db58bf620d14792d" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "comments" (
            "id" varchar PRIMARY KEY NOT NULL, 
            "threadId" varchar NOT NULL, 
            "body" text NOT NULL, 
            "createdAt" datetime NOT NULL DEFAULT (datetime('now')), 
            "authorId" varchar NOT NULL, 
            CONSTRAINT "FK_f682eb665c360168731f596b0e3" FOREIGN KEY ("threadId") REFERENCES "threads" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, 
            CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "threads"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
