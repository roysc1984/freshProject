import { format } from 'date-fns';
import uuid from 'react-native-uuid';

export const getUuid = () => uuid.v1();

export const formatDate = (date: number) => format(date, 'dd.MM.yyyy');
