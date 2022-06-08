export default function numberMatcher(prepend: string = ''): RegExp {
    return new RegExp(`${prepend}([\\d]*[.])?[\\d]+`);
}