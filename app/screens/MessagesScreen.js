import React, { useState, useEffect } from 'react';
import {FlatList, View} from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import messagesApi from "../api/messages";
import useApi from "../hooks/useApi";


function MessagesScreen() {
    const getMessagesApi = useApi(messagesApi.getMessages);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getMessagesApi.request();
    }, []);

    const handleDelete = (message) => {
        // TODO: Implement delete message API call
        console.log('Delete message:', message.id);
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await getMessagesApi.request();
        setRefreshing(false);
    }

    return (
        <Screen>
            <FlatList data={getMessagesApi.data || []}
                      keyExtractor={(message, index) => message.id?.toString() || index.toString()}
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
                      onRefresh={handleRefresh}
            />
        </Screen>
    );
}

export default MessagesScreen;
