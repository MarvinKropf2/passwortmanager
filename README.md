# SecurePass - Passwortmanager

Ein einfacher, sicherer Passwortmanager für das Schulprojekt Modul 183 (Applikationssicherheit).

## Beschreibung
SecurePass ist eine Web-Applikation, die es Benutzern ermöglicht, ihre Passwörter sicher zu speichern und zu verwalten. Der Fokus liegt dabei auf der Anwendung der OWASP Top 10 Sicherheitsprinzipien, um den Schutz sensibler Daten zu gewährleisten.

## Ziel
Entwicklung eines funktionalen Prototyps, der die sicherheitskritischen Aspekte der Passwortspeicherung (Hashing, Verschlüsselung, Zugriffskontrolle) demonstriert und gleichzeitig eine intuitive Benutzererfahrung bietet.

## Features
- **Master-Login:** Sicherer Zugriff nur über ein Master-Passwort.
- **Sichere Speicherung:** Passwörter werden niemals im Klartext gespeichert (Hashing mit Bcrypt/Argon2, Verschlüsselung mit AES).
- **CRUD-Operationen:** Erstellen, Lesen, Bearbeiten und Löschen von Passworteinträgen.
- **Passwort-Generator:** Erstellung starker Passwörter mit anpassbaren Kriterien.
- **Security-Indicator:** Visuelle Anzeige der Passwortstärke.
- **Auto-Privacy:** Automatisches Ausblenden von Passwörtern zum Schutz vor "Shoulder Surfing".
- **Secure Logging:** Keine sensiblen Daten in den Logs.

## Sicherheitskonzept (OWASP Top 10 Bezug)
- **A01:2021-Broken Access Control:** Implementierung einer strikten Benutzertrennung; jeder Benutzer sieht nur seine eigenen Daten.
- **A02:2021-Cryptographic Failures:** Verwendung von PBKDF2 zur Schlüsselableitung und AES-GCM zur Verschlüsselung. Master-Passwort wird mit Bcrypt gesalzen und gehasht.
- **A03:2021-Injection:** Alle Benutzereingaben werden validiert; Verwendung von Prepared Statements für Datenbankabfragen.
- **A04:2021-Insecure Design:** Sicherheitsanforderungen wurden von Anfang an in das Konzept integriert.
- **A05:2021-Security Misconfiguration:** Minimierung der Angriffsfläche, keine Debug-Header in Produktion, sichere Umgebungsvariablen.
- **A06:2021-Vulnerable and Outdated Components:** Regelmässige Prüfung der npm-Dependencies.
- **A07:2021-Identification and Authentication Failures:** Schutz vor Brute-Force durch Rate-Limiting oder künstliche Verzögerung beim Login.
- **A08:2021-Software and Data Integrity Failures:** Verzicht auf ungeprüfte CDNs, lokale Einbindung von Bibliotheken.
- **A09:2021-Security Logging and Monitoring Failures:** Protokollierung von sicherheitsrelevanten Events (z.B. fehlgeschlagene Logins) ohne Passwörter zu loggen.
- **A10:2021-Server-Side Request Forgery (SSRF):** Keine Features, die externe Fetch-Requests auf Benutzereingaben basieren lassen.

## Zeitplan (30h Total)

| Block | Stunden | Fokus |
| :--- | :--- | :--- |
| **01** | 4h | Dokumentation (README, Kanban), Projektstruktur, Setup |
| **02** | 4h | Backend Fundament: Express Setup, SQLite Schema, Auth Base |
| **03** | 4h | Kryptographie: Hashing & Verschlüsselungs-Logik, CRUD API |
| **04** | 4h | Frontend Fundament: Vite/React Setup, Login-UI |
| **05** | 4h | Evaluation 1: Frontend CRUD Integration, Hauptansicht |
| **06** | 4h | Security Features: Passwort-Generator, Stärken-Anzeige |
| **07** | 4h | Evaluation 2: Refinement, Secure Logging, Validation |
| **08** | 2h | Finales Testen, Projekt-Reflexion & Dokumentation |

## Projektstruktur
```text
/backend
  /config         # Konfiguration (DB, Security)
  /controllers    # API Logik
  /middleware     # Validierung, Auth-Check
  /models         # Datenbank-Modelle
/frontend
  /src/components # UI Komponenten
  /src/utils      # Krypto-Hilfsfunktionen
/docs             # Dokumentation & Bilder
README.md         # Diese Datei
KANBAN.md         # Aufgabenverwaltung
```

## Installation & Nutzung
1. Repository klonen.
2. `npm install` im `/backend` und `/frontend` ausführen.
3. `.env` Datei basierend auf `.env.example` erstellen.
4. `npm run dev` in beiden Verzeichnissen starten.

---

## Journal & Reflexion

### Block 01
- **Geplant:** Projekt-Setup, README & Kanban Erstellung, Ordnerstruktur.
- **Umgesetzt:** Alle Dokumente erstellt, Struktur definiert.
- **Probleme:** Keine.
- **Nächstes Ziel:** Backend-Grundgerüst aufbauen.

<!-- Hier folgen weitere Blöcke während der Umsetzung -->

### Persönliche Reflexion
*Wird am Ende des Projekts ausgefüllt.*
