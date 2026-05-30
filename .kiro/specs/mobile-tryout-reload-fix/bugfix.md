# Bugfix Requirements Document

## Introduction

Pada aplikasi Eduzet, pengguna yang mengakses dari perangkat mobile (HP) mengalami masalah ketika mencoba memulai tryout. Ketika tombol "Mulai Tryout" ditekan, halaman melakukan reload dan kembali ke tampilan daftar tryout yang tersedia, alih-alih memulai sesi tryout seperti yang diharapkan.

Masalah ini disebabkan oleh button elements yang tidak memiliki atribut `type="button"` secara eksplisit. Dalam HTML, button tanpa atribut type akan default ke `type="submit"`. Pada perangkat mobile, terutama iOS Safari dan browser Android, touch events dapat memicu perilaku form submission bahkan ketika button tidak berada di dalam elemen `<form>`, yang menyebabkan page reload yang tidak diinginkan.

Bug ini berdampak signifikan pada user experience di mobile, karena pengguna tidak dapat memulai tryout sama sekali dari perangkat mobile mereka.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN user taps "Mulai Tryout" button on mobile device (iOS Safari or Android browsers) THEN the system reloads the page and returns to the tryout list view instead of starting the tryout session

1.2 WHEN user taps any action button without explicit `type="button"` attribute on mobile device THEN the system triggers form submission behavior causing unexpected page reload

1.3 WHEN user taps buttons in TryoutVerificationModal on mobile device THEN the system may trigger page reload instead of executing the intended modal action

1.4 WHEN user taps subtest selection cards in TryoutSubtesSelect on mobile device THEN the system may reload the page instead of starting the selected subtest

### Expected Behavior (Correct)

2.1 WHEN user taps "Mulai Tryout" button on mobile device THEN the system SHALL navigate to the tryout session page without page reload

2.2 WHEN user taps any action button on mobile device THEN the system SHALL execute the button's onClick handler without triggering form submission behavior

2.3 WHEN user taps buttons in TryoutVerificationModal on mobile device THEN the system SHALL execute the modal actions (submit verification, confirm start, close modal) without page reload

2.4 WHEN user taps subtest selection cards in TryoutSubtesSelect on mobile device THEN the system SHALL start the selected subtest session without page reload

### Unchanged Behavior (Regression Prevention)

3.1 WHEN user clicks "Mulai Tryout" button on desktop browser THEN the system SHALL CONTINUE TO navigate to the tryout session page as before

3.2 WHEN user interacts with any button on desktop browser THEN the system SHALL CONTINUE TO execute the button's onClick handler as before

3.3 WHEN user submits forms intentionally (e.g., verification form submission) THEN the system SHALL CONTINUE TO process the form submission correctly

3.4 WHEN user navigates using keyboard or other input methods THEN the system SHALL CONTINUE TO work correctly as before

3.5 WHEN user interacts with buttons that are inside actual form elements THEN the system SHALL CONTINUE TO handle form submission appropriately
