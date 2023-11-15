# SAE 4KICKS

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

  account Account[]
  product Product[]
  affiche Affiche[]
}

model Product {
  product_uid   String   @id @default(uuid())
  name          String
  description   String
  price         Float
  image_uid     String?
  creation_date DateTime @default(now())

  product_image Image? @relation(fields: [image_uid], references: [image_uid])

  product_in_panier ProductInPanier[]
  favorite          Favorite[]
  avis              Avis[]
  product_in_achat  ProductInAchat[]
  product_categorie ProductCategories[]
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
    type SliderImg = {
        slider_id: string,
        slider_title: string,
        slider_text: string,
        call_to_action_text: string,
        call_to_action_url: string
    }
```

**Articles**

GET:
```ts
    type Articles = {

    }
    type Categories = {
        categorie_name: string,
        articles: Articles[];
    }
```

