function stylePrayerTime() {
  const datetimeValue = document.querySelector('#datetimeValue');
  const datetime = document.querySelector('#datetime');

  function setDateTimeValue(val) {
    const text = new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(
      Date.parse(val)
    );
    datetimeValue.innerText = text;
  }

  document.addEventListener('DOMContentLoaded', () =>
    setDateTimeValue(datetime.value)
  );
  datetime.addEventListener('ionChange', (e) => setDateTimeValue(e.detail.value));

}
