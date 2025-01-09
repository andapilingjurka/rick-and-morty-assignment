Rick and Morty Character Listing App

This application fetches and displays a list of Rick and Morty characters using Apollo Client and the Rick and Morty GraphQL API. Users can explore characters with various features like filtering, sorting, and infinite scrolling. A language switcher in the footer allows toggling between languages for an improved user experience.

Features

  1.Character Details: Name, Status, Species, Gender, and Origin.
  2.Filters: Filter by Status and Species.
  3.Sorting: Sort by Name and Origin.
  4.Infinite Scrolling: Load characters dynamically as you scroll.
  5.Language Support: Toggle between English and German in the footer.
  6.Error Handling: Graceful messages for errors and loading states.
  7.Responsive UI: Styled with CSS and Bootstrap.

Technologies

  1.Frontend: ReactJS
  2.GraphQL: Apollo Client
  3.API: Rick and Morty GraphQL API
  4.Styling: CSS and Bootstrap
  5.Localization: react-i18next

Setup

1.Clone the Repository:
  git clone <repository-url>
  cd <repository-folder>
  
2.Install Dependencies:
  npm install

3.Start the App:
  npm start
Open http://localhost:3000 in your browser.

How It Works
Apollo Client: Fetches character data with filtering and pagination.
Infinite Scrolling: Automatically loads more characters on scroll.
Filters/Sorting: Dynamic filtering by status/species and sorting by name/origin.
Language Switcher: Switches field labels and text between English and German using react-i18next.
