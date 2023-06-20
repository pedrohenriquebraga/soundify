import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Animation,
  AnimationContainer,
  Container,
  ContentContainer,
  Description,
  GrantPermissionsButton,
  GrantPermissionsButtonText,
  Title,
} from "./styles";
import { useBoarding } from "../../../contexts/boarding";

const Permissions: React.FC = () => {
  const [grantedFiles, setGrantedFiles] = useState(false);
  const { handleSetOnBoarded } = useBoarding();

  const handleGo = async () => {
    handleSetOnBoarded();
  };

  useEffect(() => {
    (async () => {
      const { granted } = await MediaLibrary.getPermissionsAsync(false);

      setGrantedFiles(granted);
    })();
  }, []);

  const handleGetPermissions = async () => {
    const { granted, status, canAskAgain } = await MediaLibrary.requestPermissionsAsync(
      false
    );    

    if (granted) {
      setGrantedFiles(true);
      return;
    }

    if (status === MediaLibrary.PermissionStatus.DENIED) {
      if (!canAskAgain) {
        Alert.alert(
          "Infelizmente não podemos prosseguir",
          "Você não permitiu que eu tenha acesso a suas músicas!"
        );
        return;
      }
    }
  };

  return (
    <Container>
      <AnimationContainer>
        <Animation
          source={require("../../../assets/permission.json")}
          loop={false}
          autoPlay
        />
      </AnimationContainer>
      <ContentContainer>
        <Title>Preciso de algumas permissões</Title>
        <Description>
          Algumas permissões devem ser dadas ao app para que seja possível ter
          acesso as músicas armazenadas no aparelho. Não usaremos essas
          permissões para outros propósitos!
        </Description>
        <GrantPermissionsButton
          onPress={handleGetPermissions}
          disabled={grantedFiles}
        >
          <GrantPermissionsButtonText>
            <Feather
              name={grantedFiles ? "check-circle" : "alert-circle"}
              size={16}
            />{" "}
            {grantedFiles ? "Tudo certo por aqui!" : "Aceitar permissões"}
          </GrantPermissionsButtonText>
        </GrantPermissionsButton>
      </ContentContainer>
      <Button
        content={
          grantedFiles
            ? "Yeah! Tudo pronto para começarmos"
            : "Preciso das permissões para continuar"
        }
        enabled={grantedFiles}
        onPress={handleGo}
      />
    </Container>
  );
};

export default Permissions;
