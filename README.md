# Dentbul

##### Başlamadan önce

- [Sistem Gereksinimleri](#sistem-gereksinimleri)
- [Global Paketler](#global-paketler)
- [Kurulum](#kurulum)
- [Geliştirme](#geliştirme)
- [Production](#production)
- [Klasör Yapısı](#klasör-yapısı)

### **Sistem Gereksinimleri**

- [NodeJS]
- [Yarn]
- [Ruby]
- [RubyGems] - _Eğer Ruby ile birlikte gelmezse_

[nodejs]: http://nodejs.org
[yarn]: http://yarnpkg.com
[ruby]: https://www.ruby-lang.org/
[rubygems]: https://rubygems.org/pages/download

### **Global Paketler**

- [sass] - `$ gem install sass`
- [scss_lint] - `$ gem install scss_lint`

[sass]: https://github.com/sass/sass
[scss_lint]: https://github.com/brigade/scss-lint

### **İçerdiği Paketler**

- [Mobx](https://mobx.js.org/) - _State Management_
- [Next](https://nextjs.org/) - _Server Side Rendering_
- [Axios](https://alligator.io/react/axios-react/) - _HTTP Client_

### **Windows İçin Not**

- Package.json scripts içerisinde, _format:ts_, _format:css_, _format:check_ aşağıdaki gibi değiştirilmelidir.

```sh
  "format:ts": "prettier --write \"**/*.{ts,tsx}\"",
  "format:css": "prettier-stylelint --quiet --write \"**/*.scss\"",
  "format:check": "prettier -c \"**/*.{ts,tsx}\"",
```

### **Kurulum**

```sh
$ git clone git@gitlab.bigoen.net:frontend/dentbul.git projectName
$ cd projectName
$ yarn install
```

### **Geliştirme**

Next'in sunuma başlaması ve değişiklikleri takip etmesi için,

```sh
$ yarn dev
```

Typescript ve Sass dosyalarını formatlamak için,

```sh
$ yarn format
```

Typescript dosyalarını kontrol etmek için,

```sh
$ yarn format:Ts
```

Biçimlendirme hatalarını kontrol etmek için,

```sh
$ yarn format:check
```

Biçimlendirme hatalarını kontrol etmek ve formatlamak için,

```sh
$ yarn format:css
```

**http://localhost:3000 adresinden projeyi geliştirmeye başlayabilirsiniz.**

### Production

```sh
$ yarn build
$ yarn start
```

### **Klasör Yapısı**

- **pages** : _Sayfaların oluşturalacağı alan_
- **components** : _Sayfa içerisinde kullanılacak componentlerin yerleştirileceği alan_
- **styles** : _Sass, görsel ve font dosyaları için ayrılmış alan_
  - **components** : _Site içerisinde kullanılan componentlerin stil dosyaları_
  - **mixins** : _Özel sass fonksiyonları_
  - **overrides** : _Gerekli durumlarda bootstrap stillerini ezen stil dosyaları_
  - **variables** : _Global site değişkenleri_
  - **utils** : _Sass yazarken kullanılacak kısayol araçları_
- **stores** : _Mobx store dosyalarını için ayrılmış alan_
- **public** : _Font, icon ve dil dosyalarını için ayrılmış alan_
  - **fonts** : _Font dosyaları bulunur. Varsayılan olarak ProductSans vardır_
  - **icons** : _SVG iconlar bulunur. Eklenen iconun ayarları şu şekildedir; width & height: 100%, fill: currentColor olarak değiştirilmelidir. Örneği dosya içerisinde mevcut_
  - **locales** : _Dil dosyaları için ayrılmış alan_
  - **images** : _Resimler için ayrılmış alan_
- **interfaces** : _Type'lerin tutulacağı alan_
- **utils** : _Tekrar kullanımı gerektiren, kısayol sağlayan araçlar için ayrılmış alan_
- **server** : _Sayfaların route yönetimi_

<!-- - app - _Kitin gövde yapısı_
  - components - _Sayfa içerisinde kullanılacak componentlerin yerleştirileceği alan_
    - Componente ait .test, .stories, .tsx, .scss dosyalarının bulunduğu klasörler.
  - pages - _Sayfaların oluşturalacağı alan_
  - styles - _Sass, görsel ve font dosyaları için ayrılmış alan_
    - fonts - _Font dosyaları_
    - images - _İmaj dosyaları_
    - sass - _Sass dosyaları_
      - bootstrap - _Bootstrap dosyalarının bulunduğu klasör_
      - components - _Site içerisinde kullanılan componentlerin stil dosyaları_
      - mixins - _Özel sass fonksiyonları_
      - overrides - _Gerekli durumlarda bootstrap stillerini ezen stil dosyaları_
      - variables - _Global site değişkenleri_
  - static - _Statik olarak sunulacak dosyaları kullanılacağı klasör_
    - assets - _Bu klasör webpack tarafından generate edilir_
- types - _Next route yönetimi konfigürasyon ayarlamalarınn barındırıldığı klasör_
- server - _Sunucu tarafındaki yapılandırmaların barındırıldığı klasör_ -->

### **Kod yazarken dikkat edilmesi gerekenler**

1.  Yukarıdaki uygulama yapısı **asla değiştirilmemelidir.** Yeni klasörler ve dosyalar eklenebilir.
2.  Uygulama içerisindeki bulunan sınıfların metodları camelCase ve auto-bind olacak şekilde yazılmalıdır. Örnek: `autoBind = () => {};`
3.  Dinamiklik olmadığı sürece inline style **asla yazılmamalıdır.**
4.  Tüm data akışı **Mobx** üzerinden sağlanmalıdır.
5.  Uygulama içerisinde yer alan **stylelint** ve **prettier** için hazırlanmış ayalara uygun şekilde kod yazılmalıdır. Lütfen bunları kullanınız!
6.  Uygulama proje adına göre **yeniden** isimlendirilmelidir.
