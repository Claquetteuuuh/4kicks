# SAE 4KICKS

## Documentation

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

