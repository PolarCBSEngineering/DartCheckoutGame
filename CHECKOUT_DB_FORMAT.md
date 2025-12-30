# Checkout Veritabanı Formatı

## JSON Yapısı

Checkout veritabanı `checkout-db.js` dosyasında bir JavaScript constant olarak saklanacak.

### Temel Format:

```javascript
const CHECKOUT_DB = {
  170: {
    path: ["T20", "T20", "DB"],
    alternatives: [],
    desc: "The Big Fish - Tek yol.",
  },
  169: {
    path: null,
    alternatives: null,
    desc: "Bogey - Bitirilemez",
  },
  121: {
    path: ["T11", "T18", "D20"],
    alternatives: [["S11", "T18", "DB"]],
    desc: "Bullseye'dan kaçınmak için T11 tercih edilir.",
  },
  100: {
    path: ["T20", "D20"],
    alternatives: [
      ["T18", "D23"],
      ["T16", "D26"],
    ],
    desc: "2 dart checkout",
  },
  // ... 40-170 arası tüm sayılar
};
```

## Alan Açıklamaları

### `path` (Array)

- **Tip:** Array of strings veya `null`
- **Açıklama:** Optimal checkout yolu
- **Format:** Her eleman bir dart atışını temsil eder
  - `"T20"` = Treble 20 (60 puan)
  - `"D20"` = Double 20 (40 puan)
  - `"S20"` = Single 20 (20 puan)
  - `"DB"` = Double Bull (50 puan)
  - `"SB"` = Single Bull (25 puan)
- **Örnek:** `["T20", "T20", "DB"]` = T20, T20, Double Bull

### `alternatives` (Array)

- **Tip:** Array of arrays veya `null`
- **Açıklama:** Alternatif geçerli yollar
- **Format:** Her alternatif yol bir array
- **Örnek:**
  ```javascript
  "alternatives": [
    ["S11", "T18", "DB"],
    ["T11", "D34"]
  ]
  ```

### `desc` (String)

- **Tip:** String
- **Açıklama:** Açıklama veya strateji notu
- **Örnek:** `"The Big Fish - Tek yol."`

## Özel Durumlar

### Bogey Sayıları (Bitirilemez)

```javascript
"169": {
  "path": null,
  "alternatives": null,
  "desc": "Bogey - Bitirilemez"
}
```

### Tek Dart Checkout

```javascript
"50": {
  "path": ["DB"],
  "alternatives": [],
  "desc": "Double Bull"
}
```

### İki Dart Checkout

```javascript
"100": {
  "path": ["T20", "D20"],
  "alternatives": [
    ["T18", "D23"]
  ],
  "desc": "2 dart checkout"
}
```

## Dosya Örneği

Aşağıdaki formatta bir dosya hazırlayabilirsiniz:

**checkout-data.json** (veya Excel/CSV'den dönüştürebilirsiniz):

```json
{
  "170": {
    "path": ["T20", "T20", "DB"],
    "alternatives": [],
    "desc": "The Big Fish - Tek yol."
  },
  "169": {
    "path": null,
    "alternatives": null,
    "desc": "Bogey - Bitirilemez"
  },
  "168": {
    "path": null,
    "alternatives": null,
    "desc": "Bogey - Bitirilemez"
  },
  "167": {
    "path": ["T20", "T19", "DB"],
    "alternatives": [],
    "desc": "3 dart checkout"
  }
  // ... 40'a kadar devam
}
```

## Excel/CSV Formatı (Alternatif)

Eğer Excel'de hazırlamak isterseniz:

| Score | Path        | Alternatives | Description                                   |
| ----- | ----------- | ------------ | --------------------------------------------- |
| 170   | T20,T20,DB  |              | The Big Fish - Tek yol.                       |
| 169   |             |              | Bogey - Bitirilemez                           |
| 121   | T11,T18,D20 | S11,T18,DB   | Bullseye'dan kaçınmak için T11 tercih edilir. |

**Not:** CSV'den JSON'a dönüştürme scripti de yazabilirim.

## Minimum Gereksinim

Başlangıç için en azından şu sayılar hazır olmalı:

- 170, 167, 164, 161, 160
- 121, 100, 80, 60, 50, 40
- Tüm bogey sayıları (169, 168, 166, 165, 163, 162, 159)

Kalan sayılar sonra eklenebilir.

---

**Hazır olduğunuzda dosyayı paylaşın, ben `checkout-db.js` formatına dönüştürürüm!**
