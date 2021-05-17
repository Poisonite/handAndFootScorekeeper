import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import PlayView from "../components/PlayView";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage className="home">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to the Hand and Foot Scorekeeper!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid justify-content-center>
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h1>Ready to Play Hand and Foot?</h1>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <PlayView />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
