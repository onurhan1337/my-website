---
date: "2022-08-16"
title: React — Custom hooks nedir ve nasıl kullanılır?
subtitle: Class component kullanma ihtiyacı olmadan tekrar kullanılabilir fonksiyonlardır.
tweetUrl: değiştirilecek
---

# React — Custom hooks nedir ve nasıl kullanılır?

## Custom hooks nedir?

Hooks, React’ın 16.8 sürümü ile hayatımıza giren ve class component kullanma ihtiyacı olmadan function component içeriğinde de state kullanabilmemize olanak sağlayan yapıdır. Custom hooks ise tekrar kullanılabilir fonksiyonlardır.

## Neden custom hooks kullanmalıyız?

* Component tree’nin okunulabilirliğini geliştirir ve hata ayıklamayı kolaylaştırır.
Birleştirilebilir ve yeniden düzenlenebilir mantık. Custom hooks, standart hooklar gibi functional componentlere birden fazla çağırılabilir.

* Daha temiz kod yapısı oluşturmamıza olanak sağlar.

* Bileşenlerin aksine, özel Hook’larda belirli bir fonksiyon imzasının bulunma zorunluluğu yoktur. Hangi değerlerin parametre olarak verileceğine ve Hook’tan neyin geri döndürüleceğine biz karar verebiliriz. Başka bir deyişle, normal fonksiyonlarda yaptığımız gibi Hook’ları kodlayabiliriz. Sadece react hooks olduğunu anlayabilmesi için başında use kullanmamız 

## Custom hooks — Örnek

Örnek olarak bir custom hooks fikri oluşturalım. Ben bu örnekte `usePostStatus` adında bir tane oluşturacağım. Amacı ise yazdığım bir post’un kullanıcıya görünür olup olmamasını sağlayacak basit bir kod içeriği olacak.

<Figure
  src="/blog/custom-hooks/code-1.png"
/>

Evet hook’umuzu geliştirmiş varsayalım. Şimdi konuşacağımız konu ise bunu nasıl farklı componentlerde kullanabileceğimiz üzerine olacak.

<Figure
  src="/blog/custom-hooks/code-2.png"
/>

<Figure
  src="/blog/custom-hooks/code-3.png"
/>

Kodda gerçeğe çok yakın bir yaklaşım sergiledik başka şekilde uyarlayıp geliştirerek uygulamalarınıza aktarmak veya başka çözümlerde kullanmak mümkün.

## Kısa notlar

* Hook başında “use” kullanmak zorunda değilsiniz ancak tavsiye edilen yaklaşım bu şekilde hem de react tarafında çeşitli [*sorunlarla*](https://reactjs.org/docs/hooks-rules.html "React hooks rules") uğraşabilirsiniz.

* Yukarıda örnekte görüldüğü üzere kodun mantığında değişikliğe gitmedik ancak bu bize çok fayda sağladı, iki fonksiyondaki işi teke indirip farklı yerlerde çağırıp kullanabilir hale getirdik.

* İlk bakışta bir fikir kafanızda canlanabilir, “acaba bu custom hook’u 2 farklı componentlerde kullandığımda onlardaki state çakışır mı?”. Cevap Hayır. Custom hooklar çeşitli işlemleri tekrar kullanabilmek için oluşturulur ancak her defasında state ve içindeki değerler izole edilir o yüzden rahatça kullanabiliriz.

Custom hooklar hayal gücümüz ile şekillenir, standart hooklarda olmayan bir esneklik sunar. Aklımıza gelen çoğu konuda custom hook geliştirebiliriz. Ayrıca eğer karmaşık bir yapı olmadığı sürece custom hook oluşturulmaması öneriliyor. En yaygın olarak redux içeriğindeki reducer yapısının custom hook ile entegre edilip basitleştirilmiş yapılarımızı kullanabiliriz.

Ayrıca custom hook arasında props taşınımı için [dökümanı](https://reactjs.org/docs/hooks-custom.html) ziyaret edebilirsiniz.

## Kapanış

Yazımı okuduğunuz için teşekkür ederim. Elimden geldiğince dökümandan ve başka kaynaklardan yararlanarak kısa özet ve örnek halinde bir yazı sunmaya çalıştım. Aşağıdan yararladığım kaynaklara göz atabilir ve farklı örneklerle bilginizi pekiştirebilirsiniz. Kolaylıklar dilerim.

https://reactjs.org/docs/hooks-custom.html
https://reactjs.org/docs/hooks-rules.html
https://www.boardinfinity.com/blog/react-hooks-and-its-advantages/