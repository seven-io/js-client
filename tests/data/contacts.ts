import {Contact, ContactsParams} from '../../src/types';
import {ContactsAction} from '../../src/constants/enums/ContactsAction';

export const contactsWriteParams: ContactsParams = {
    action: ContactsAction.Write,
    email: 'tom@test.er',
    nick: 'Tom Tester',
    empfaenger: '+490123457890',
};

export const dummyReadCsv =
    '"4798035";"";""\n'
    + '"4799646";"";""\n'
    + '"4799647";"";""\n'
    + '"4799648";"";""\n'
    + '"4799649";"";""\n'
    + '"3172517";"Hansi";"004917666666666"\n'
    + '"2925186";"Tatti";"004919016315610"\n'
    + '"3172515";"Tatti";"004917777777777"';

export const dummyWriteCsv = '152\n4848025';
export const dummyWriteJson = {return: '152', id: '5125215'};

export const dummyReadJson: Contact[] = [
    {ID: '4798035', Name: '', Number: ''},
    {ID: '4799646', Name: '', Number: ''},
    {ID: '4799647', Name: '', Number: ''},
    {ID: '4799648', Name: '', Number: ''},
    {ID: '4799649', Name: '', Number: ''},
    {ID: '3172517', Name: 'Hansi', Number: '004917666666666'},
    {ID: '2925186', Name: 'Tatti', Number: '004919016315610'},
    {ID: '3172515', Name: 'Tatti', Number: '004917777777777'},
];