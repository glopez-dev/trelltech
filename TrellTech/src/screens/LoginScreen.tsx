import { StyleSheet, View, Text } from 'react-native';
import { 
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  AlertCircleIcon,
  Input,
  InputField
} from '@gluestack-ui/themed';

export default function LoginScreen() {
    return (
        <View style={styles.view}>
            <VStack space="md">
              <FormControl>
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField type="text" placeholder="username" />
                </Input>
              </FormControl>

              <FormControl
                  size="md"
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={true}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField type="password" placeholder="password" />
                  </Input>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Must be at least 6 characters.
                    </FormControlHelperText>
                  </FormControlHelper>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      At least 6 characters are required.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});