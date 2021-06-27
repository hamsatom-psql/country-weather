Feature: Weather in a city

  Scenario: Weather in a real city in a real country
    Given city name is "Copenhagen"
    And country code is "DK"
    When I ask about weather in that place
    Then the weather should be in city "Copenhagen"
    And country should be "DK"
    And place id should be "2618425"

  Scenario: Weather in a non existent city in a real country
    Given city name is "OutOfThisWorld"
    And country code is "DK"
    When I ask about weather in that place
    Then I should get no weather

  Scenario: Weather in a real city in a non existent country
    Given city name is "Copenhagen"
    And country code is "XX"
    When I ask about weather in that place
    Then I should get no weather

  Scenario: Weather in a cities with the same name
    Given city name is "London"
    And country code is not specified
    When I ask about weather in that place
    Then I should get multiple weather details
    And with different countries