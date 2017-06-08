export function getStyleByStatus(status) {
  switch(status){
    case 'running':
      return 'success';
    case 'finished':
      return 'warning';
    case 'errored':
      return 'danger';
    case 'repaired':
    case 'idle':
      return 'info';
    default:
      return;
  }
}