import {Component} from 'react'

class DataService extends Component {
    static naturalShortDate(date_str, locale) {
        let month_names = {
            names_en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            names_es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            names_pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        };

        date_str = date_str.split('-');
        let year = date_str[0];
        let month = date_str[1];
        let day = date_str[2];

        let month_name = month_names['names_' + locale][parseInt(month)-1];
        return day + " " + month_name + " " + year.substr(-2);
    }

    static naturalLongDateTime(date, locale) {
        let month_names = {
            names_en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            names_es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        };

        let date_str = DataService.formatDateYMD(date).split('-');
        let year = date_str[0];
        let month = date_str[1];
        let day = date_str[2];
        let month_name = month_names['names_' + locale][parseInt(month)-1];

        let hours = (date.getHours() + 24) % 12 || 12;
        if (hours < 10) hours = "0" + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;

        let seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;

        let ampm = date.getHours() >= 12 ? 'PM' : 'AM';

        return month_name + " " + day + ", " + year + " - " + hours + ":" + minutes + ":" + seconds + " " + ampm;
    }

    static naturalLongDate(date, locale) {
        let month_names = {
            names_en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            names_es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        };

        let date_str = DataService.formatDateYMD(date).split('-');
        let year = date_str[0];
        let month = date_str[1];
        let day = date_str[2];
        let month_name = month_names['names_' + locale][parseInt(month)-1];

        return month_name + " " + day + ", " + year;
    }

    static naturalShortDateByMonthAndYear(month, year, locale) {
        let month_names = {
            names_en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            names_es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            names_pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        };

        let month_name = month_names['names_' + locale][month-1];
        year = year.toString().substr(-2);

        return month_name + year;
    }

    static occidentalDate(date_str) {
        date_str = date_str.split('-');
        let year = date_str[0];
        let month = date_str[1];
        let day = date_str[2];

        return day + "/" + month + "/" + year;
    }    

    static naturalDateByMonthAndYear(month, year, locale) {
        let month_names = {
            names_en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            names_es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            names_pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],            
        };

        let month_name = month_names['names_' + locale][month-1];
        return month_name + " " + year;
    }

    static formatDateYMD(date) {
        let day = date.getDate();
        if (day<10) {day = "0" + day}

        let month = date.getMonth() +1;
        if (month<10) {month = "0" + month}

        let year = date.getFullYear();

        return year + "-" + month + "-" + day;
    }

    static numberFormat(number) {
        if (!number) return number;

        number = number.toString().split(".");
        number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        return number.join(".");
    }

    static capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    static pluralize(singular) {
        if (singular === 'Feliz') return 'Felices';
        if (singular === 'Neutral') return 'Neutrales';
        if (singular === 'Triste') return 'Tristes';

        return singular;
    }

    static getDateFromYMD(ymd) {
        let date_parts = ymd.split('-');
        return new Date(date_parts[0], date_parts[1]-1, date_parts[2]);
    }

    static getFirstDateStr(month, year) {
        let date = new Date(year, month-1, 1);
        return DataService.formatDateYMD(date);
    }

    static getLastDateStr(month, year) {
        let date = new Date(year, month, 0);
        return DataService.formatDateYMD(date);
    }
}

export default DataService;
