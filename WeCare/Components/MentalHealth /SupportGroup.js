import React, { useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

function ParticipantView({ participantId }) {
    const { webcamStream, webcamOn } = useParticipant(participantId);
  
    return webcamOn && webcamStream ? (
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={"cover"}
        style={{
          height: 300,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
      />
    ) : (
      <View
        style={{
          backgroundColor: "grey",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
      </View>
    );
  }

function MeetingView() {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants, changeWebcam } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
    setTimeout(() => {
      changeWebcam();
    }, 300);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {joined && joined == "JOINED" ? (
        <>
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </>
      ) : joined && joined == "JOINING" ? (
        <Text>Joining the meeting...</Text>
      ) : (
        <TouchableOpacity
          onPress={joinMeeting}
          style={{ backgroundColor: "black", alignSelf: "center", padding: 12 }}
        >
          <Text style={{ color: "#fff" }}>Join the meeting</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
const App = () => {
 return (
  <MeetingProvider
  config={{
    meetingId: "qysl-v0hs-s8ul",
    micEnabled: true,
    webcamEnabled: true,
    name: "Adam's Org",
  }}
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwMDdhNjIzOC01Y2JiLTQ4ZjItYWEzZC0yNTRhMzMyZmEwZjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMjU2MTUwMywiZXhwIjoxNzEyNjQ3OTAzfQ.IYgGdWi_OvDMRLLYHcJWqahEUVynmjhR9Cn3KXRq_mI"
>
  <MeetingView />
</MeetingProvider>
 )
};
export default App;