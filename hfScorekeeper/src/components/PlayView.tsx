import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  useIonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { GameProps } from "../models/props";

// Retreve the game info from local Storage
const game: GameProps = JSON.parse(localStorage.getItem("gameProps") || "{}");

const PlayView = () => {
  // Ionic Alerts
  const [present] = useIonAlert();

  // Stateful value to track which view to show the user
  let [playState, setPlayState] = useState<string>();

  // Stateful Forms - state creation
  let [players, setPlayers] = useState<number>();
  let [teamNames, setTeamNames] = useState<any>({});

  // Stateful Forms - state updates
  const playersChange = (event: any) => {
    setPlayers(event.target.value);
  };

  // Player Count form submission handler
  const createTeams = (event: React.FormEvent) => {
    event.preventDefault(); // Stop page from refreshing etc

    // Store Game Info
    let gameProps = new GameProps();

    // Build out default template for the teams to be injected in next step
    if (players && players >= 2 && players % 2 === 0) {
      gameProps.playerCount = players;
      gameProps.teamCount = players / 2;
      for (let i = 0; i < gameProps.teamCount; i++) {
        gameProps.teams.push({
          name: "",
          score: 0,
          opener: 50,
          members: [],
          id: i + 1,
        });
      }
      localStorage.setItem("gameProps", "{}");
      localStorage.setItem("gameProps", JSON.stringify(gameProps));

      setPlayState("buildTeams"); // Move to the next step
      return;
    }

    // Show alert if the data is bad
    present({
      header: `${players} Player(s) is Invalid`,
      message: `Use even values greater than 2`,
      buttons: ["Try Again"],
    });
    return;
  };

  if (playState === "start") {
    return (
      <div className="playView start">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Begin by answering some basic info!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={createTeams}>
              <IonItem>
                <IonLabel position="floating">Total Number of Players</IonLabel>
                <IonInput
                  required
                  type="number"
                  min="2"
                  name="players"
                  id="players"
                  value={players}
                  onIonChange={playersChange}
                ></IonInput>
              </IonItem>

              <IonButton
                fill="outline"
                shape="round"
                color="secondary"
                type="submit"
              >
                Confirm
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    );
  }

  const updateTeamName = (index: number, event: any) => {
    // Create temp storage var to join new and existing data
    let newTeamNames: any = teamNames;
    newTeamNames[index] = event.target.value;

    // Output unified data back to the stateful var
    setTeamNames(newTeamNames);
  };

  const populateTeams = (event: React.FormEvent) => {
    event.preventDefault(); // Stop page from refreshing etc

    let updatedGame: GameProps = game;
    // Find number of team names which have been entered
    const teamNameCount = Object.keys(teamNames).length;

    if (teamNameCount === updatedGame.teams.length) {
      for (const key in teamNames) {
        // Convert the string key provided to a number so
        //  it can be used to call the array index
        const numKey: number = parseInt(key, 10);

        // Pass each collected key into the updated game
        //  object which contains the other game data
        updatedGame.teams[numKey].name = teamNames[numKey];
      }

      // Store the updated game in local storage
      localStorage.setItem("gameProps", JSON.stringify(updatedGame));

      setPlayState("buildMembers"); // Move to the next step
      console.log(game);
      return;
    }
    // Show alert if the data is bad
    present({
      header: `Not all Names Given`,
      message: `Please Fill out all fields!`,
      buttons: ["Try Again"],
    });
    return;
  };

  if (playState === "buildTeams") {
    return (
      <div className="playView buildTeams">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle></IonCardSubtitle>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={populateTeams}>
              {game.teams.map((team, i) => (
                <IonItem key={team.id}>
                  <IonLabel position="floating">
                    Enter Team {team.id}'s Name
                  </IonLabel>
                  <IonInput
                    required
                    type="text"
                    name={`teamName-${team.id}`}
                    id={`teamName-${team.id}`}
                    value={team.name}
                    onIonChange={(e) => updateTeamName(i, e)}
                  ></IonInput>
                </IonItem>
              ))}
              <IonButton
                fill="outline"
                shape="round"
                color="secondary"
                type="submit"
              >
                Continue
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    );
  }

  return (
    <div className="playView">
      <IonButton
        fill="outline"
        shape="round"
        color="secondary"
        onClick={() => setPlayState("start")}
      >
        Start!
      </IonButton>
    </div>
  );
};

export default PlayView;
