-- CreateTable
CREATE TABLE "Account" (
    "account_uid" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "connection_type" TEXT NOT NULL DEFAULT 'EMAIL',
    "password" TEXT,
    "preference" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission" TEXT NOT NULL DEFAULT 'USER',
    "image_uid" TEXT,
    CONSTRAINT "Account_image_uid_fkey" FOREIGN KEY ("image_uid") REFERENCES "Image" ("image_uid") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "image_uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "product_uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image_uid" TEXT,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_image_uid_fkey" FOREIGN KEY ("image_uid") REFERENCES "Image" ("image_uid") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductInPanier" (
    "product_uid" TEXT NOT NULL,
    "account_uid" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,

    PRIMARY KEY ("account_uid", "product_uid"),
    CONSTRAINT "ProductInPanier_account_uid_fkey" FOREIGN KEY ("account_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductInPanier_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product" ("product_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "product_uid" TEXT NOT NULL,
    "account_uid" TEXT NOT NULL,

    PRIMARY KEY ("account_uid", "product_uid"),
    CONSTRAINT "Favorite_account_uid_fkey" FOREIGN KEY ("account_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product" ("product_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Avis" (
    "avis_uid" TEXT NOT NULL PRIMARY KEY,
    "notation" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "account_uid" TEXT NOT NULL,
    "product_uid" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Avis_account_uid_fkey" FOREIGN KEY ("account_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avis_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product" ("product_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PromotionCode" (
    "promo_uid" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "coefficient" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "ShipAddress" (
    "address_uid" TEXT NOT NULL PRIMARY KEY,
    "postal_code" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "cmp_address" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "account_uid" TEXT NOT NULL,
    "more_info" TEXT,
    CONSTRAINT "ShipAddress_account_uid_fkey" FOREIGN KEY ("account_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achat" (
    "achat_uid" TEXT NOT NULL PRIMARY KEY,
    "account_uid" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address_uid" TEXT NOT NULL,
    "promo_uid" TEXT,
    CONSTRAINT "Achat_promo_uid_fkey" FOREIGN KEY ("promo_uid") REFERENCES "PromotionCode" ("promo_uid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Achat_address_uid_fkey" FOREIGN KEY ("address_uid") REFERENCES "ShipAddress" ("address_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Achat_account_uid_fkey" FOREIGN KEY ("account_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductInAchat" (
    "product_uid" TEXT NOT NULL,
    "achat_uid" TEXT NOT NULL,

    PRIMARY KEY ("product_uid", "achat_uid"),
    CONSTRAINT "ProductInAchat_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product" ("product_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductInAchat_achat_uid_fkey" FOREIGN KEY ("achat_uid") REFERENCES "Achat" ("achat_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categorie" (
    "categorie_uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "creation_date" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "categorie_uid" TEXT NOT NULL,
    "product_uid" TEXT NOT NULL,

    PRIMARY KEY ("categorie_uid", "product_uid"),
    CONSTRAINT "ProductCategories_categorie_uid_fkey" FOREIGN KEY ("categorie_uid") REFERENCES "Categorie" ("categorie_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductCategories_product_uid_fkey" FOREIGN KEY ("product_uid") REFERENCES "Product" ("product_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_uid" TEXT NOT NULL PRIMARY KEY,
    "user_uid" TEXT NOT NULL,
    "admin_uid" TEXT,
    "fixed" BOOLEAN NOT NULL,
    "achat_uid" TEXT NOT NULL,
    CONSTRAINT "Ticket_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_admin_uid_fkey" FOREIGN KEY ("admin_uid") REFERENCES "Account" ("account_uid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ticket_achat_uid_fkey" FOREIGN KEY ("achat_uid") REFERENCES "Achat" ("achat_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "message_uid" TEXT NOT NULL PRIMARY KEY,
    "account_uid" TEXT NOT NULL,
    "ticket_uid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Message_account_uid_fkey" FOREIGN KEY ("account_uid") REFERENCES "Account" ("account_uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_ticket_uid_fkey" FOREIGN KEY ("ticket_uid") REFERENCES "Ticket" ("ticket_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Affiche" (
    "affiche_uid" TEXT NOT NULL PRIMARY KEY,
    "subtitle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "callToAction" TEXT,
    "callToActionUrl" TEXT,
    "image_uid" TEXT NOT NULL,
    CONSTRAINT "Affiche_image_uid_fkey" FOREIGN KEY ("image_uid") REFERENCES "Image" ("image_uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionCode_code_key" ON "PromotionCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_name_key" ON "Categorie"("name");
