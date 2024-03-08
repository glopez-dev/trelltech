//buttonAdd
import React from 'react';
import { Button, ButtonIcon, View, AddIcon } from "@gluestack-ui/themed";

export default function ButtonAdd({ onPress, disabled }) {
    return (
        <View >
            <Button
                size="sm"
                variant="solid"
                action="primary"
                onPress={onPress}
                bg='#2c333b'
                mb='$5'
                opacity={disabled ? 0.5 : 1}
                disabled={disabled}
                isFocusVisible={false}
            >
                <ButtonIcon as={AddIcon} size="xl" />
            </Button>
        </View>
    );
}
