/**
 * 페이지에 적용될 공통 타이틀 양식을 반환합니다.
 * @param title
 */
export const makeTitle = (title: string) => {
  if (title === '') return 'Keyboduck';
  return `Keyboduck - ${title}`;
};
