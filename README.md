# Görsel iskelet (HTML & CSS)

**Amaç:** tıklanabilir sadece tahta olsun; pivot merkezde;

- `#scene` (sahne)
- `#pivot` (üçgen/destek görseli; sadece dekoratif)
- `#plank` (tahta; **sadece burası tıklanabilir**)
- `#objects` (tahta üzerinde taşınan nesneler için kapsayıcı, plank’in içinde)
- `#hud` (sol/sağ toplam ağırlık ve tork göstergesi)

# Coding plan

1. **HTML+CSS skeleton** (plank/pivot/hud yerleşsin)
2. **Projenin modüler hali ve ilk tıklama**  (plank üstünde tıklanan x’i yazma)
3. **Fizik hesap** (tork, hedef açı bulma ve (-+30 derece sınırı) )
4. **Animasyon** (Ağırlık eklendiğinde yeni açıya yumuşak geçiş)
5. **Nesne oluşturma** (her tıklamadan sonra rastgele ağırlık belirleme (1-10 kg) ve o ağırlığın ekranda gözükmesi)
6. **HUD** (sağ sol ağırlıklar sıradaki ağırlık ve tork bilgiis)
7. **Kalıcılık** (Data storage sayfa yenilenmesi)
8. **Responsive Tasarım** (Mobil cihazlar ve tablet için düzenlemeler)
9. **Bonus**
> -En son belirli bir ağırlığı geçerse tahterevalli kırılsın.
> -Zamana bağlı diğer eklentiler.