import React, { useState } from 'react';
import {FlatList, View} from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";

const initialMessages = [
    {
        id: 1,
        title: 'T1',
        description: 'This is a test where I am trying' +
            'to make this a long message' +
            'where it goes more than 3 sentences' +
            'so we will see how that goesr who knows' +
            'we are still herer',
        image: require('../assets/jzpic.jpeg')
    },
    {
        id: 2,
        title: 'T2',
        description: 'D2',
        image: require('../assets/jzpic.jpeg')
    }
]


function MessagesScreen() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = (message) => {
        const newMessages = messages.filter(m => m.id !== message.id);
        setMessages(newMessages);
    }

    return (
        <Screen>
            <FlatList data={messages}
                      keyExtractor={message => message.id.toString()}
                      renderItem={({item}) => (
                          <ListItem
                              title={item.title}
                              subTitle={item.description}
                              image={item.image}
                              onPress={() => console.log('Message Selected', item)}
                              renderRightActions={() =>
                                  <ListItemDeleteAction onPress={() => handleDelete(item)}/>}
                          />
                      )}
                      ItemSeparatorComponent={ListItemSeparator}
                      refreshing={refreshing}
                      onRefresh={() => {
                          setMessages(initialMessages)
                      }}
            />
        </Screen>
    );
}

export default MessagesScreen;
