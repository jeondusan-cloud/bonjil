from fastapi import APIRouter

router = APIRouter(prefix="/glossary", tags=["glossary"])


@router.get("/{term_key}")
def get_glossary_term(term_key: str):
    return {"message": "stub - to be implemented", "term_key": term_key}
