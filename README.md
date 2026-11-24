# Minutnik Pomodoro

Prosta aplikacja HTML/CSS/JavaScript z 25-minutowymi cyklami pracy, 5-minutową przerwą po każdym cyklu oraz 15-minutową przerwą po czwartym cyklu.

## Uruchomienie

Otwórz plik `index.html` w przeglądarce albo uruchom prosty serwer:

```powershell
python -m http.server 8000
```

Następnie wejdź na `http://localhost:8000`.

## Rozbiór promptu z pokazu

Poniżej przedstawiono rozbiór prośby do agenta na podobieństwo promptu z lekcji. Każda linia należy do jednego rodzaju:

1. „Stwórz działający minutnik w przeglądarce.” — **co ma powstać**
2. „Użyj HTML, CSS i JavaScript.” — **jak** (język i format implementacji)
3. „Zbuduj cykl 25 minut pracy i krótką przerwę.” — **co ma powstać**
4. „Dodaj długą przerwę po każdym czwartym cyklu.” — **co ma powstać**
5. „Umieść przyciski Start, Pauza i Reset.” — **co ma powstać**
6. „Nie używaj zewnętrznych bibliotek ani backendu.” — **jak** (ograniczenie implementacji)
7. „Podziel kod na index.html, styles.css i app.js.” — **jak** (organizacja plików)
8. „Zadanie jest skończone, kiedy aplikacja uruchamia się po otwarciu index.html i odlicza czas.” — **po czym poznać, że skończone**

- Liczba zdań o tym, **co ma powstać**: 4.
- Liczba zdań o tym, **jak** ma powstać: 3.
- Liczba zdań o tym, **po czym poznać, że skończone**: 1.

Najmniej jest zdań o tym, **po czym poznać, że skończone**. To wąski punkt: bez takiego kryterium agent i użytkownik mogą uznać za gotowy różny wynik.

## Reset licznika cykli w środku przerwy

Aktualny program po naciśnięciu Reset w środku przerwy **zostawia liczniki cykli bez zmian**, wraca do etapu pracy i ustawienia 25:00. To moja decyzja jako twórcy programu, a nie decyzja modelu: reset nie powinien cofać już zakończonych sesji pracy ani fałszować historii.
