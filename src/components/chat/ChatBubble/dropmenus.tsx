import { MenuItem } from '@components/Popover';
import { Feather, Ionicons } from '@expo/vector-icons';

export const canRegenerateMenu = (onCopyToClipboard: () => void, onRegenerate: () => void): MenuItem[] => {
  return [
    {
      label: 'Copy',
      icon: <Ionicons name="copy" />,
      onPress: onCopyToClipboard,
    },

    {
      label: 'Regenerate',
      icon: <Ionicons name="reload" />,
      onPress: () => onRegenerate(),
    },
    {
      label: 'Share',
      icon: <Ionicons name="share-social" />,
      onPress: () => {},
    },
  ];
};

export const modelMenu = (onCopyToClipboard: () => void): MenuItem[] => {
  return [
    {
      label: 'Copy',
      icon: <Ionicons name="copy" />,
      onPress: onCopyToClipboard,
    },
    {
      label: 'Share',
      icon: <Ionicons name="share-social" />,
      onPress: () => {},
    },
  ];
};

export const userMenu = (onEditPrompt: () => void): MenuItem[] => {
  return [
    {
      label: 'Edit',
      icon: <Feather name="edit-3" size={15} />,
      onPress: onEditPrompt,
    },
  ];
};
export const chatHistoryMenus = (onEdit: () => void, onDelete: () => void): MenuItem[] => {
  return [
    {
      label: 'Rename Chat',
      icon: <Feather name="edit-3" size={15} />,
      onPress: onEdit,
    },
    {
      label: 'Delete Chat',
      icon: <Feather name="trash-2" size={15} />,
      onPress: onDelete,
    },
  ];
};
