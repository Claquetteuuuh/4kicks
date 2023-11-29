# SAE 4KICKS

## Developpement

Demarrer le projet en mode développement:

```bash
npm run dev
```

### Docker

Lancement d'un conteneur docker en local:

```bash
docker compose up
```

### Vercel

Envoie des changements sur Vercel:

```bash
vercel --prod
```

## Documentation

### Database

```prisma
model Account {
  account_uid     String      @id @default(uuid())
  first_name      String
  last_name       String
  username        String      @unique
  email           String      @unique
  connection_type Connection  @default(EMAIL)
  password        String?
  preference      Preference?
  creation_date   DateTime    @default(now())
  permission      Permission  @default(USER)
  image_uid       String?
  completed       Boolean
  validated       Boolean     @default(false)
  profile_image Image? @relation(fields: [image_uid], references: [image_uid])

  product_in_panier ProductInPanier[]
  favorite          Favorite[]
  avis              Avis[]
  shipAddress       ShipAddress[]
  achat             Achat[]
  ticket_user       Ticket[]          @relation(name: "user")
  ticket_admin      Ticket[]          @relation(name: "admin")

  message           Message[]
}

model Image {
  image_uid String @id @default(uuid())
  name      String @unique

  account        Account[]
  affiche        Affiche[]
  product_images ProductImages[]
}

model ProductImages {
  image_uid   String
  product_uid String

  image   Image   @relation(fields: [image_uid], references: [image_uid])
  product Product @relation(fields: [product_uid], references: [product_uid])

  @@id([image_uid, product_uid])
}

model Product {
  product_uid   String   @id @default(uuid())
  name          String
  description   String
  price         Float
  creation_date DateTime @default(now())

  product_in_panier ProductInPanier[]
  favorite          Favorite[]
  avis              Avis[]
  product_in_achat  ProductInAchat[]
  product_categorie ProductCategories[]
  product_color     ProductColors[]
  product_taille    ProductTaille[]
  product_images    ProductImages[]
}

model Taille {
  taille_uid String @id @default(uuid())
  value      String

  product_taille ProductTaille[]
}

model ProductTaille {
  taille_uid  String
  product_uid String

  product Product @relation(fields: [product_uid], references: [product_uid])
  taille  Taille  @relation(fields: [taille_uid], references: [taille_uid])

  @@id([taille_uid, product_uid])
}

model Color {
  color_uid String @id @default(uuid())
  value     String

  product_color ProductColors[]
}

model ProductColors {
  color_uid   String
  product_uid String

  color   Color   @relation(fields: [color_uid], references: [color_uid])
  product Product @relation(fields: [product_uid], references: [product_uid])

  @@id([color_uid, product_uid])
}

model ProductInPanier {
  product_uid String
  account_uid String
  quantite    Int

  account Account @relation(fields: [account_uid], references: [account_uid])
  product Product @relation(fields: [product_uid], references: [product_uid])

  @@id([account_uid, product_uid])
}

model Favorite {
  product_uid String
  account_uid String

  account Account @relation(fields: [account_uid], references: [account_uid])
  product Product @relation(fields: [product_uid], references: [product_uid])

  @@id([account_uid, product_uid])
}

model Avis {
  avis_uid      String   @id @default(uuid())
  notation      Int
  content       String
  account_uid   String
  product_uid   String
  creation_date DateTime @default(now())

  account Account @relation(fields: [account_uid], references: [account_uid])
  product Product @relation(fields: [product_uid], references: [product_uid])
}

model PromotionCode {
  promo_uid   String @id @default(uuid())
  code        String @unique
  coefficient Float

  achat Achat[]
}

model ShipAddress {
  address_uid   String  @id @default(uuid())
  postal_code   Int
  address       String
  cmp_address   String?
  city          String
  country       String
  phone_number  String
  account_uid   String
  more_info     String?
  first_name    String
  last_name     String
  email_address String

  account Account @relation(fields: [account_uid], references: [account_uid])

  achat Achat[]
}

model Achat {
  achat_uid     String   @id @default(uuid())
  account_uid   String
  creation_date DateTime @default(now())
  address_uid   String
  promo_uid     String?

  promo        PromotionCode? @relation(fields: [promo_uid], references: [promo_uid])
  ship_address ShipAddress    @relation(fields: [address_uid], references: [address_uid])
  account      Account        @relation(fields: [account_uid], references: [account_uid])

  product_in_achat ProductInAchat[]
  ticket           Ticket[]
}

model ProductInAchat {
  product_uid String
  achat_uid   String

  product Product @relation(fields: [product_uid], references: [product_uid])
  achat   Achat   @relation(fields: [achat_uid], references: [achat_uid])

  @@id([product_uid, achat_uid])
}

model Categorie {
  categorie_uid String    @id @default(uuid())
  name          String    @unique
  creation_date DateTime? @default(now())

  product_categorie ProductCategories[]
}

model ProductCategories {
  categorie_uid String
  product_uid   String

  categorie Categorie @relation(fields: [categorie_uid], references: [categorie_uid])
  product   Product   @relation(fields: [product_uid], references: [product_uid])

  @@id([categorie_uid, product_uid])
}

// TICKET
model Ticket {
  ticket_uid String  @id @default(uuid())
  user_uid   String
  admin_uid  String?
  fixed      Boolean
  achat_uid  String

  account Account  @relation(name: "user", fields: [user_uid], references: [account_uid])
  admin   Account? @relation(name: "admin", fields: [admin_uid], references: [account_uid])
  achat   Achat    @relation(fields: [achat_uid], references: [achat_uid])

  message Message[]
}

model Message {
  message_uid String @id @default(uuid())
  account_uid String
  ticket_uid  String
  content     String

  account Account @relation(fields: [account_uid], references: [account_uid])
  ticket  Ticket  @relation(fields: [ticket_uid], references: [ticket_uid])
}

// Affiche

model Affiche {
  affiche_uid     String  @id @default(uuid())
  subtitle        String
  title           String
  description     String
  callToAction    String?
  callToActionUrl String?
  image_uid       String

  image Image @relation(fields: [image_uid], references: [image_uid])
}

enum Connection {
  OTHER
  EMAIL
}

enum Preference {
  MALE
  FEMALE
  MIXE
}

enum Permission {
  ADMIN
  MODERATOR
  USER
}

```

### Format des données

#### Page Principale

**Slider**:

GET: 
```ts
    type AfficheType = {
    afficheUid: string,
    subtitle?: string,
    title: string,
    description: string,
    callToAction: string,
    callToActionUrl: string,
    imageLien: string
  }
```

**Articles**

GET:
```ts
    type Article = {
      productUID : string,
      nameProduct: string,
      price: number,
      imageLien: string[]
    }
    type Categories = {
        categorie_name: string,
        articles: Article[];
    }
    type Avis = {
      avisUID: string,
      notation: number,
      content: string,
      creationDate: Date,
      userName: string,
    }
    type Affiche = {
      afficheUid: string,
      subtitle?: string,
      title: string,
      description: string,
      callToAction: string | null,
      callToActionUrl: string | null,
      imageLien: string
    }
    type Produit = {
      productUID : string,
      nameProduct: string,
      price: number,
      imageLien: string[],
      colorProduct: string[],
      tailleProduct: string[],
      avisMoyenne: number,
      avisProduct: AvisType[],
    }
  ```

### Code d'erreur

#### Connection

C-001: Un compte enregistré comme connection par EMAIL n'a pas de mot de passe enregistré en DB

C-002: Le compte n'a pas été trouvé dans la base de donnée

C-003: L'utilisateur n'a pas entré le bon mot de passe

C-004: L'utilisateur n'a pas entré le mot de passe ou l'email

C-005: Une tentative de completer le compte mais il est déjà completé

C-006: L'utilisateur complete son compte, le compte n'existe pas en base de donnée mais il ne se crée pas

### Dashboard

#### Categories

C-001: Try to get all categories but it create a db error

#### Accounts

A-001: Account uid not specified in header in dashboard delete request

A-002: Fail delete account in dashboard delete request