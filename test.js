async function callApi() {
  let i = 0;

  while (i < 1000) {
    i++;

    // https://www.isroset.org/pdf_paper_view.php?paper_id=3566&10-ISROSET-IJSRCSE-09722.pdf
    await fetch(
      'https://www.isroset.org/journal/IJSRCSE/full_paper_view.php?paper_id=3566',
    ).then(async data => {
      console.log('data', data);
      await fetch(
        'https://www.isroset.org/pdf_paper_view.php?paper_id=3566&10-ISROSET-IJSRCSE-09722.pdf',
      );
    });
  }
}

callApi();
