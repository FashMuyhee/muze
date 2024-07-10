import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import ProfileSheet from './profile';
import ChangePasswordSheet from './change-password';
import DeleteAccountSheet from './delete-account';

registerSheet('profile', ProfileSheet);
registerSheet('change-password', ChangePasswordSheet);
registerSheet('delete-account', DeleteAccountSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    profile: SheetDefinition;
    'change-password': SheetDefinition;
    'delete-account': SheetDefinition;
  }
}

export {};
