import moment from 'moment';

export const getRandomColor = () => {
     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const getDaysLeft = (duration: number) => {
     const now = moment();
     const endDate = now.clone().add(duration, 'days');
     return Math.max(0, endDate.diff(now, 'days'));
};
